const axios = require('axios')
;(async ()=>{
  try{
    const res = await axios.get('https://dummyjson.com/posts', { params: { limit: 9, skip: 0 } })
    console.log('status:', res.status)
    console.log('posts:', Array.isArray(res.data.posts) ? res.data.posts.length : 'n/a')
    console.log('total:', res.data.total)
  }catch(e){
    console.error('error fetching dummyjson:', e && e.message)
  }
})()
