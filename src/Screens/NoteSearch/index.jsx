import "./Notesearch.css";

export default function NoteSearch() {
  const images=["icon-calculator.svg","icon-supervisor.svg","icon-karma.svg","icon-team-builder.svg"];
  const data={
    courseName:"Operating system",
    topicsIncluded:"semaphore,Deadlock",
  }
  return (
    <div className="view-port">
      <div className="header">
        <h1>Search Through all notes</h1>

        <p>
          Our Artificial Intelligence powered tools use millions of project data
          points to ensure that your project is successful
        </p>
      </div>
      <div className="row1-container">
        <Card data={data} image={images[Math.floor(Math.random()*4-.1)]}/>
        <div className="box red">
          <h2>Team Builder</h2>
          <p>
            Scans our talent network to create the optimal team for your project
          </p>
          <img
            src="https://assets.codepen.io/2301174/icon-team-builder.svg"
            alt=""
          />
        </div>

        <div className="box box-down blue">
          <h2>Calculator</h2>
          <p>
            Uses data from past projects to provide better delivery estimates
          </p>
          <img
            src="https://assets.codepen.io/2301174/icon-calculator.svg"
            alt=""
          />
        </div>
      </div>
      <div className="row2-container">
        <div className="box orange">
          <h2>Karma</h2>
          <p>Regularly evaluates our talent to ensure quality</p>
          <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

const Card = (props) => (
  <>
    <div className="box box-down cyan">
      <h2>{props.data.courseName}</h2>
      <p>{props.data.topicsIncluded}</p>
      <img src={`https://assets.codepen.io/2301174/${props.image}`} alt="" />
    </div>
  </>
);
