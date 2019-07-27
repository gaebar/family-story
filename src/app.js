fetch('/api/stories')
    .then(res => res.json())
    .then(stories => console.log(stories))
    .catch(err => console.log(err))
