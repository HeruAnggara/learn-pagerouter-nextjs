import Image from 'next/image'

export default function TestingComponent() {
  return (
    <>
      <h3 className="text-xl font-bold">Testing Component</h3>
      {[...Array(10)].map((_, index) => (
        // <Image
        //   key={index}
        //   src="/testing.jpg"
        //   width={200}
        //   height={200}
        //   alt="testing image"
        // />
        <img
          key={index}
          src="/testing.jpg"
          width={200}
          height={200}
          alt="testing image"
        />
      ))}
    </>
  )
}
