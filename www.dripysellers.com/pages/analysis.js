import React from 'react'
import styles from '../styles/Home.module.css'
const analysis = () => {
  return (
    <div>
      <iframe className={styles.frame} title="Dripy sales analysis" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=19f88c49-c893-4f2b-b0bf-03ffce0fcc50&autoAuth=true&ctid=168de17f-17b1-411c-b0b8-ab22b7411658&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWluZGlhLWNlbnRyYWwtYS1wcmltYXJ5LXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9" frameborder="0" allowFullScreen="true"></iframe>
    </div>
  )
}

export default analysis
