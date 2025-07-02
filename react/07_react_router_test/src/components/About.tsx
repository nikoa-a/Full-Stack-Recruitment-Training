import { useNavigate } from "react-router-dom"

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>This is the React Router Test App</h2>
      <button onClick={() => navigate("/secret")}>
        Go to Secret Page
      </button>
    </>
  )
}

export default About;