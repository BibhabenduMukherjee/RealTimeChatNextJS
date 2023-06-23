import { fetchRedis } from './redis'

export const getFriendsByUserId = async (userId: string) => {
  // retrieve friends for current user
  //console.log("userid", userId)

  // [id1,id2..]
  const friendIds = (await fetchRedis(
    'smembers',
    `user:${userId}:friends`
  )) 
  console.log("friend ids", friendIds)

  // loop through the id's and get the info of the friends
  const friends = await Promise.all(
    new Array(friendIds).map(async (friendId) => {
      const friend = await fetchRedis('get', `user:${friendId}`) as string
      const parsedFriend = JSON.parse(friend) as User
      return parsedFriend
    })
  )

  return friends
}
