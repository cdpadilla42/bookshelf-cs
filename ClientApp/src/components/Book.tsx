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

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async ({ queryKey }) => {
    const [, { id }] = queryKey;
    if (!id) return null;
    const response = await fetch(`api/book/edit/${id}`);
    const data = await response.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['books', { id }],
    queryFn: fetchBook,
  });

  const SAMPLEDATA = {
    name: 'cool',
    authorID: 2,
    summary: 'yes',
    rating: 2,
  };

  if (isLoading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

  return (
    <>
      <h1>Book</h1>
      <div className="container text-container">
        <div className="row py-4">
          <div className="column">
            <h6>Name</h6>
            <span>{SAMPLEDATA.name}</span>
          </div>
        </div>
        <div className="row py-4">
          <div className="column">
            <h6>AuthorID</h6>
            <span>{SAMPLEDATA.authorID}</span>
          </div>
        </div>
        <div className="row py-4">
          <div className="column">
            <h6>Summary</h6>
            <span>{SAMPLEDATA.summary}</span>
          </div>
        </div>
        <div className="row py-4">
          <div className="column">
            <h6>Rating</h6>
            <span>{SAMPLEDATA.rating}</span>
          </div>
        </div>
      </div>
      <a href={`/admin/book/edit/${id}`}>
        <button type="submit" className="btn btn-primary">
          Edit Book
        </button>
      </a>
    </>
  );
};

export default Book;
