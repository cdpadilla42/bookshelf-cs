import React from 'react';
import { Formik, FormikErrors } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BookSubmitObject } from '../types';

interface MyFormValues {
  name: string;
  authorID: string;
  summary: string;
  rating: string;
}

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async ({ queryKey }) => {
    const [, { id }] = queryKey;
    if (!id) return null;
    const response = await fetch(`book/edit/${id}`);
    const data = await response.json();
    return data;
  };

  const handleBookFormSubmit = async (values: BookSubmitObject) => {
    let path = 'book';
    if (id) {
      path = `book/edit/${id}`;
    }
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    return response;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['books', { id }],
    queryFn: fetchBook,
  });

  const initialValues: MyFormValues = data || {
    name: '',
    authorID: '',
    summary: '',
    rating: '',
  };

  if (isLoading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: FormikErrors<MyFormValues> = {};
        if (parseInt(values.rating) > 5 || parseInt(values.rating) < 1) {
          errors.rating = 'Must be within 1 and 5';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          const valuesToSend: BookSubmitObject = {
            ...values,
            authorID: parseInt(values.authorID),
            rating: parseInt(values.rating),
          };
          const res = await handleBookFormSubmit(valuesToSend);
          const data = await res.json();
          if (res && res.status === 200) {
            toast.success('Book updated!');
            navigate('/page/books');
          } else {
            toast.warn(`Something went wrong! ${data.title}`);
          }
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
            <label htmlFor="name" className="form-label">
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
            <label htmlFor="authorID" className="form-label">
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
            <label htmlFor="summary" className="form-label">
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
            <label htmlFor="rating" className="form-label">
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
          <button type="submit" disabled={true} className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditBook;
