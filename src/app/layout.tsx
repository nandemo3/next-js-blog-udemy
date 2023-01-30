import './globals.css'

import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css"

const name = "Shin Code"

type RootLayoutType = {
  children: React.ReactNode
  home?: boolean,
}

export default function RootLayout(
  props : RootLayoutType) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
      <div className={styles.container}>
            <header className={styles.header}>
                {props.home ? <>
                  <img src="/images/profile.png" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}/>
                  <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>: <>
                <img src="/images/profile.png" className={utilStyles.borderCircle}/>
                  <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>}
            </header>
            <main>
                {props.children}
            </main>
        </div>
      </body>
    </html>
  )
}
