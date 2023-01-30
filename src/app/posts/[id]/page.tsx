import { use } from "react";

import { getAllPostIds, getPostData } from "@/app/lib/post";
import RootLayout from "../../layout";
import utilStyles from "../../../styles/utils.module.css"



async function getData(id: string) {
    const postData = await getPostData(id)
    return {
      props: {
        postData,
      }
    }
  }

const Page = ({ params }: any) => {
  const { postData } = use(getData(params.id)).props;

    return (
        <RootLayout home={false}>
          <article>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              {postData.date}
            </div>
            <div dangerouslySetInnerHTML={({__html: postData.blogContentHTML})}/>
          </article>
          </RootLayout>
    );
}

export default Page;