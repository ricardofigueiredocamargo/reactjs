import { useQuery } from "@tanstack/react-query";
import { getPosts } from './api/posts'

export default function PostsList1() {
    const postQuery = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        //staleTime: 1000,
        refetchInterval: 1000,
    })

    // postQuery.fetchStatus === 'fetching' --> 'idle'
    // postQuery.status === 'loading' --> 'success'/'error'

    if (postQuery.status === 'loading') return <h1>Loading...</h1>
    if (postQuery.status === 'error') {
        return <h1>{JSON .stringify(postQuery.error)}</h1>
    }

    return (
        <>
            <h1>Posts List 1</h1>
            <ol>
                {postQuery.data.map(post => {
                    <li key={post.id}>{post.title}</li>
                })}
            </ol>
        </>
    )
}