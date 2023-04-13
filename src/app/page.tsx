import Button from "@/component/ui/Button";
import { db } from "@/lib/db";
export default async function Home() {

  
  return (
    <main className="">
      <h1 className="text-green-800">hello</h1>
      <Button isLoading ={true}/>
    </main>
  )
}
