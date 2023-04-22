const redis_url = process.env.UPSTASH_REDIS_REST_URL;
const auth_token = process.env.UPSTASH_REDIS_REST_TOKEN
type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis (command : Command , ...args : (number|string)[]){
  const commandUrl = `${redis_url}/${command}/${args.join('/')}`
  const response = await fetch( commandUrl , {
        headers : {
            Authorization : `Bearer ${auth_token}`
        },
        cache : 'no-store'
    })

    if(!response.ok){
        throw new Error(`Error executing Redis command : ${response.statusText}`)
    }

    const data = await response.json()  as {result:string}
    return data.result
}
