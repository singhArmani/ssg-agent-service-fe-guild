import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../component/show-expensive"));

export default function Home(props) {
  const [showExpensive, setShowExpensive] = useState(false);
  return (
    <>
      <h1>Home Page, name: {props.name}</h1>
      <Name />
      {showExpensive && <DynamicComponent />}
      <button onClick={() => setShowExpensive(true)}>Show</button>
    </>
  );
}

export async function getStaticProps() {
  console.log("getStaticProps: runs server side only");

  // Data from your backend, or an API rest call
  const name = await new Promise((resolve) =>
    setTimeout(resolve, 3000, "Agent service")
  );

  return {
    props: { name },
  };
}

const Name = () => {
  const [name, setName] = useState();

  useEffect(() => {
    async function getName() {
      const name = await new Promise((resolve) =>
        setTimeout(resolve, 3000, "Aman")
      );

      setName(name);
    }

    getName();
  }, []);

  if (!name) return <p>Loading....</p>;

  return <p>Name: {name}</p>;
};
