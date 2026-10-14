const CLOUD_NAME='xvncs8ud';
const FIREBASE_URL='https://walidvoyages-13332-default-rtdb.firebaseio.com';
const ALLOWED=new Set(['https://www.walidvoyages.com','https://walidvoyages.com','https://walidvoyages.github.io','http://localhost:8000','http://127.0.0.1:8000']);
function respond(data,status=200,origin=''){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','access-control-allow-origin':origin,'vary':'Origin','access-control-allow-headers':'authorization, content-type','access-control-allow-methods':'POST, OPTIONS','cache-control':'no-store'}})}
function hex(buffer){return [...new Uint8Array(buffer)].map(b=>b.toString(16).padStart(2,'0')).join('')}
async function authenticate(req,env){
 const token=(req.headers.get('authorization')||'').replace(/^Bearer\s+/i,'');if(!token)throw Error('Token Firebase manquant');
 const lookup=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='+encodeURIComponent(env.FIREBASE_WEB_API_KEY),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({idToken:token})});
 if(!lookup.ok)throw Error('Session Firebase invalide');
 const user=(await lookup.json()).users?.[0];if(!user?.localId)throw Error('Utilisateur introuvable');
 const r=await fetch(FIREBASE_URL+'/admins/'+encodeURIComponent(user.localId)+'.json?auth='+encodeURIComponent(token),{headers:{'cache-control':'no-store'}});
 if(!r.ok||await r.json()!=='admin')throw Error('Accès réservé aux administrateurs');
 return user;
}
export default {async fetch(req,env){
 const origin=req.headers.get('origin')||'';
 if(!ALLOWED.has(origin))return respond({error:'Origin non autorisée'},403,'');
 if(req.method==='OPTIONS')return respond({},200,origin);
 if(req.method!=='POST')return respond({error:'Méthode interdite'},405,origin);
 try{
  await authenticate(req,env);
  const path=new URL(req.url).pathname;
  if(path==='/publish'){
   if(!env.GITHUB_TOKEN||!env.GITHUB_REPO)throw Error('GITHUB_TOKEN / GITHUB_REPO manquants');
   const gh=await fetch('https://api.github.com/repos/'+env.GITHUB_REPO+'/actions/workflows/seo.yml/dispatches',{method:'POST',headers:{authorization:'Bearer '+env.GITHUB_TOKEN,accept:'application/vnd.github+json','x-github-api-version':'2022-11-28','user-agent':'walid-voyages-worker','content-type':'application/json'},body:JSON.stringify({ref:'main'})});
   if(!gh.ok)throw Error('GitHub Actions HTTP '+gh.status);return respond({ok:true},200,origin);
  }
  if(path==='/upload'){
   if(!env.CLOUDINARY_API_SECRET||!env.CLOUDINARY_API_KEY)throw Error('Cloudinary secrets manquants');
   const fd=await req.formData();const file=fd.get('file');
   if(!(file instanceof File)||file.size>8*1024*1024||!['image/png','image/jpeg','image/webp','image/avif'].includes(file.type))return respond({error:'Image invalide (JPG/PNG/WebP/AVIF; max 8 Mo)'},400,origin);
   const timestamp=Math.floor(Date.now()/1000).toString();const folder='walid-voyages';
   const payload=`folder=${folder}&timestamp=${timestamp}${env.CLOUDINARY_API_SECRET}`;
   const signature=hex(await crypto.subtle.digest('SHA-1',new TextEncoder().encode(payload)));
   const upload=new FormData();upload.append('file',file);upload.append('api_key',env.CLOUDINARY_API_KEY);upload.append('timestamp',timestamp);upload.append('folder',folder);upload.append('signature',signature);
   const result=await fetch('https://api.cloudinary.com/v1_1/'+CLOUD_NAME+'/image/upload',{method:'POST',body:upload});const data=await result.json();
   if(!result.ok||!data.secure_url)return respond({error:'Cloudinary: '+(data.error?.message||result.status)},502,origin);
   return respond({secure_url:data.secure_url,public_id:data.public_id},200,origin);
  }
  return respond({error:'Route inconnue'},404,origin);
 }catch(e){return respond({error:e.message||'Erreur serveur'},403,origin)}
}}
