import { db } from "@/db";
import Link from "next/link";
import { Badge } from "../ui/badge";
import  paths  from "@/paths";


export default async function TopicList() {

const topics=await db.topic.findMany();
const renderedTopics=topics.map((topic)=>{
    return(
        <div key={topic.id}>
            <a href={paths.showTopics(topic.slug)}>
            <Badge color="destructive" variant="outline">
                {topic.slug}
            </Badge>
            </a>
        </div>
    )
});
return(
    <div className="flex flex-row flex-wrap gap-2">
        {renderedTopics}
    </div>
)

}
