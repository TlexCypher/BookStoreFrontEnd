import { useEffect, useState } from "react"
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    axios
    .get(`http://localhost:8000/books/${id}`)
    .then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, []);

  const handleDeleteBook = () => {
    const data = {
      title: title, 
      author: author, 
      publishYear: publishYear
    };
    axios
    .delete(`http://localhost:8000/books/${id}`, data)
    .then(() => {
      setLoading(false);
      navigate("/")
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div> 
  )
}

export default DeleteBooks
