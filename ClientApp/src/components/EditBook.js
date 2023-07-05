import React, { useState } from 'react';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

const EditBook = () => {
  const { id } = useParams();
  console.log(id);

  const handleBookFormSubmit = async (values) => {
    const response = await fetch('book', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        authorID: '',
        summary: '',
        rating: '',
      }}
      validate={(values) => {
        const errors = {};
        // Validate Errors
        if (values.rating > 5 || values.rating < 1) {
          errors.rating = 'Must be within 1 and 5';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          // TODO Test... Then add React Query
          alert(JSON.stringify(values, null, 2));
          const res = await handleBookFormSubmit(values);
          console.log(res.json());
          setSubmitting(false);
        })();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitCount,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              className={classNames([
                'form-control',
                { 'is-valid': submitCount && !errors.name },
                { 'is-invalid': errors.name && touched.name },
              ])}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && (
              <div className="invalid-feedback">errors.name</div>
            )}
          </div>
          <div className="mb-3">
            <label for="authorID" class="form-label">
              Author
            </label>
            <input
              type="text"
              className={classNames([
                'form-control',
                {
                  'is-valid': submitCount && !errors.authorID,
                },
                { 'is-invalid': errors.authorID && touched.authorID },
              ])}
              name="authorID"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.authorID}
            />
            {errors.authorID && touched.authorID && (
              <div className="invalid-feedback">errors.authorID</div>
            )}
          </div>
          <div className="mb-3">
            <label for="summary" class="form-label">
              Summary
            </label>
            <input
              type="text"
              className={classNames([
                'form-control',
                {
                  'is-valid': submitCount && !errors.summary,
                },
                { 'is-invalid': errors.summary && touched.summary },
              ])}
              name="summary"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.summary}
            />
            {errors.summary && touched.summary && (
              <div className="invalid-feedback">{errors.summary}</div>
            )}
          </div>
          <div className="mb-3">
            <label for="rating" class="form-label">
              Rating
            </label>
            <input
              type="number"
              className={classNames([
                'form-control',
                {
                  'is-valid': submitCount && !errors.rating,
                },
                { 'is-invalid': errors.rating && touched.rating },
              ])}
              name="rating"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rating}
            />
            {errors.rating && touched.rating && (
              <div className="invalid-feedback">{errors.rating}</div>
            )}
          </div>
          <button type="submit" disabled={isSubmitting} class="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditBook;

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
