import React from 'react';
import { Formik, Form, Field } from 'formik';

interface FeedbackFormValues {
  production: string;
  instrumentation: string;
  vocals: string;
  songwriting: string;
  other: string;
}

const SongFeedback: React.FC = () => {
  const initialValues: FeedbackFormValues = {
    production: '',
    instrumentation: '',
    vocals: '',
    songwriting: '',
    other: ''
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-bold">Feedback</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          // Handle form submission
        }}
      >
        {() => (
          <Form>
            <label htmlFor="production">Production</label>
            <Field name="production" as="textarea" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-700 focus:ring-0" />

            <label htmlFor="instrumentation">Instrumentation</label>
            <Field name="instrumentation" as="textarea" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-700 focus:ring-0" />

            <label htmlFor="vocals">Vocals</label>
            <Field name="vocals" as="textarea" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-700 focus:ring-0" />

            <label htmlFor="songwriting">Songwriting</label>
            <Field name="songwriting" as="textarea" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-700 focus:ring-0" />

            <label htmlFor="other">Other Feedback</label>
            <Field name="other" as="textarea" className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-700 focus:ring-0" />

            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit Feedback
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SongFeedback;
