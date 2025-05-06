// import Image from 'next/image'

import TestingComponent from '@/component/testingComponent'

// import dynamic from 'next/dynamic'

// const TestingComponent = dynamic(() => import('@/component/testingComponent'), {
//   loading: () => <p>Loading...</p>,
// })

export default function About() {
  return (
    <>
      <h3 className="text-xl font-bold">About Page</h3>
      {/* <Image src="/testing.jpg" width={200} height={200} alt="testing image" /> */}
      {/* <img src="/testing.jpg" width={200} height={200} alt="testing image" /> */}
      <TestingComponent />
    </>
  )
}
