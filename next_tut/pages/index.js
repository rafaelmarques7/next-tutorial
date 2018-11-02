import Layout from "../components/MyLayout"
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
    <li>
        <Link 
            as={`/p/${props.id}`}
            href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)

const Index = (props) => (
    <div>
        <Layout>
            <p>Hello Next.js</p>
            <h1>My Blog</h1>
            <ul>
                <PostLink title="hello world" id="hello-world"/>
                <PostLink title="yes" />
                <PostLink title="no" />
                <PostLink title="why" />
            </ul>
            <h1>Batman TV Shows</h1>
            <ul>
            {props.shows.map(({show}) => (
                <li key={show.id}>
                <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                    <a>{show.name}</a>
                </Link>
                </li>
            ))}
            </ul>
        </Layout>
    </div>
)


Index.getInitialProps = async function() {
 const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
 const data = await res.json()
 
 console.log(`Show data fetched. Count: ${data.length}`)
 return {
     shows: data
 }
}


export default Index