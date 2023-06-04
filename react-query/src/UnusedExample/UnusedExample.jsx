import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

// /posts --> ['posts']
// /posts/1 --> ['posts', post.id]
// /posts?authorId=1 --> ['posts', { author.id: 1 }]
// /posts/2/comments --> ['posts', post.id, 'comments']

function App() {
  const queryClient = useQueryClient()

  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: (obj) => wait(1000).then(() => {
      console.log(obj)
      return [...POSTS]
    })  
  })

  const newPostMutation = useMutation({
    mutationFn: title => {
      return wait(1000).then(() => 
        POSTS.push({ id: crypto.randomUUID(), title})
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })    

  if (postQuery.isLoading) return <h1>Loading...</h1>
  if (postQuery.isError) {
    return <pre>{JSON.stringify(postQuery.error)}</pre>
  }

  return (
    <>
      <h1>TanStack Query</h1>
      <div>
        {postQuery.data.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
      <button 
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate('New Post')}
      >
        Add new
      </button> 
    </>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
