import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import UserRegistration from '../components/userRegistration'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header/>
        <UserRegistration/>
      </main>
    </div>
  )
}
