import { use } from "react"
import Link from "next/link"
import styles from "./page.module.css"
import utilStyles from "../styles/utils.module.css"
import { getPostsData } from "./lib/post"

// SSGの場合
async function getData() {
  const allPostsData = getPostsData()

  return {
    props: {
      allPostsData,
    }
  }
}

const Home = () => {
  const {props} = use(getData());
  return (
    <div>
      <section className={utilStyles.headingMd}>
        <p>私のプロフィールです</p>
      </section>
      <section className={utilStyles.headingMd}>
        <h2>🗒エンジニアのブログ</h2>
        <div className={styles.grid}>
          {props.allPostsData.map(({id, title, date, thumbnail}, index) =>  (<article key={index}>
              <Link href={`posts/${id}`}>
                <img src={thumbnail} alt="" className={styles.thumbnailImage} />
              </Link>
              <Link href={`posts/${id}`} className={utilStyles.boldText}>
              {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>)
          )}
        </div>
      </section>
    </div>
  )
}

export default  Home;