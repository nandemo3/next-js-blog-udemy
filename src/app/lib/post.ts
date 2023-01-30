import path from "path"
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type Posts = {
    id: string;
    title?: string;
    date?: string;
    thumbnail?: string
}

type Post =  {
    id: string;
    blogContentHTML: string,
    title?: string;
    date?: string;
    thumbnail?: string
}

const postsDirectory = path.join(process.cwd(), "src/app/posts/data");

//mdファイルのデータを取り出す
export const getPostsData = (): Posts[] => {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData: Posts[] = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); // ファイル名(id)

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        }
    })
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    })
}

//idに基づいてブログ投稿データを返す
export const getPostData = async (id: string): Promise<Post> => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content)

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}