import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Book } from '../../../types';
import { Button, Feedback, Form, Input, Textarea } from '../../atoms';
import { ButtonsWrapper, FormRow } from './styles';

export interface BookFormValues {
  title: string;
  subtitle: string;
  description: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Book title is required'),
  subtitle: Yup.string(),
  description: Yup.string(),
});

const mapPropsToValues = ({ title, subtitle, description }: Book) => {
  return {
    title: title || '',
    subtitle: subtitle || '',
    description: description || '',
  };
};

interface BookFormProps {
  book: Book;
  onSubmit: (values: BookFormValues) => void;
  handleDelete?: () => void;
}

const BookForm = forwardRef(
  (
    { book, onSubmit, handleDelete }: BookFormProps,
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    const initialValues = useMemo(() => mapPropsToValues(book), [book]);

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (
        values: BookFormValues,
        { setStatus }: FormikHelpers<BookFormValues>
      ) => {
        setStatus('');

        try {
          onSubmit(values);
        } catch (error: any) {
          setStatus(error.message);
        }
      },
    });

    return (
      <Form
        ref={ref}
        onReset={formik.handleReset}
        onSubmit={formik.handleSubmit}
      >
        <FormRow cols={2}>
          <div>
            <label htmlFor='title-input'>Title</label>
            <Input
              id='title-input'
              type='text'
              aria-label='Book title'
              aria-describedby='title-info'
              placeholder='E.g. Adventures of Huckleberry Finn'
              {...formik.getFieldProps('title')}
              isInvalid={formik.touched.title && !!formik.errors.title}
            />
            {formik.touched.title && !!formik.errors.title && (
              <Feedback id='title-info' type='error'>
                {formik.errors.title}
              </Feedback>
            )}
          </div>

          <div>
            <label htmlFor='subtitle-input'>Subtitle</label>
            <Input
              id='subtitle-input'
              type='text'
              aria-label='Book subtitle'
              aria-describedby='subtitle-info'
              placeholder={`E.g. Tom Sawyer's Comrade`}
              {...formik.getFieldProps('subtitle')}
              isInvalid={formik.touched.subtitle && !!formik.errors.subtitle}
            />
            {formik.touched.subtitle && !!formik.errors.subtitle && (
              <Feedback id='subtitle-info' type='error'>
                {formik.errors.subtitle}
              </Feedback>
            )}
          </div>
        </FormRow>

        <FormRow>
          <div>
            <label htmlFor='description-textarea'>Description</label>
            <Textarea
              id='description-textarea'
              rows={12}
              aria-label='Book description'
              aria-describedby='description-info'
              placeholder='E.g. Climb aboard the raft with Huck and Jim and drift away...'
              {...formik.getFieldProps('description')}
              isInvalid={
                formik.touched.description && !!formik.errors.description
              }
            />
            {formik.touched.description && !!formik.errors.description && (
              <Feedback id='description-info' type='error'>
                {formik.errors.description}
              </Feedback>
            )}
          </div>
        </FormRow>

        <ButtonsWrapper>
          {typeof handleDelete === 'function' ? (
            <Button
              type='button'
              variant='outline'
              size='lg'
              colorScheme='red'
              disabled={formik.isSubmitting}
              onClick={handleDelete}
            >
              {formik.isSubmitting ? 'Deleting' : 'Delete'}
            </Button>
          ) : (
            <span />
          )}

          <Button
            type='submit'
            variant='outline'
            size='lg'
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
        </ButtonsWrapper>

        {!!formik.status && <p>{formik.status}</p>}
      </Form>
    );
  }
);

export default BookForm;
