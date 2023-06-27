import React, { useState } from 'react';

const EditAuthors = () => {
  const [name, setName] = useState();

  const handleSubmit = () => {
    console.log(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Name
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={name}
          onChange={setName}
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EditAuthors;

// export class XEditAuthors extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { forecasts: [], loading: true };

//     return (
//       <form>
//         <div class="mb-3">
//           <label for="exampleInputEmail1" class="form-label">
//             Name
//           </label>
//           <input
//             type="email"
//             class="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//           />
//         </div>

//         <button type="submit" class="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     );
//   }

//   componentDidMount() {
//     this.populateWeatherData();
//   }

//   static renderForecastsTable(forecasts) {
//     return (
//       <form>
//         <div class="mb-3">
//           <label for="exampleInputEmail1" class="form-label">
//             Name
//           </label>
//           <input
//             type="email"
//             class="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//           />
//         </div>

//         <button type="submit" class="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     );
//   }

//   render() {
//     let contents = this.state.loading ? (
//       <p>
//         <em>Loading...</em>
//       </p>
//     ) : (
//       EditAuthors.renderForecastsTable(this.state.forecasts)
//     );

//     return (
//       <div>
//         <h1 id="tableLabel">Weather forecast</h1>
//         <p>This component demonstrates fetching data from the server.</p>
//         {contents}
//       </div>
//     );
//   }

//   async populateWeatherData() {
//     const response = await fetch('weatherforecast');
//     console.log(response);
//     const data = await response.json();
//     this.setState({ forecasts: data, loading: false });
//   }
// }
