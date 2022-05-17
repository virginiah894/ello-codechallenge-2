import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_BOOK_DATA } from '../graphql/Queries'
import classes from './book.module.css'

function Book() {

    //using the useQuery hook to execute our GET_BOOK_QUERY
    const { loading, error, data } = useQuery(GET_BOOK_DATA)

    const [content, setContent] = useState(true);
    const [word, setWord] = useState(null);




    //setting the number of pages 
    const [count, setCount] = useState(10);


    //setting the  value of the i tial page 
    const [value, setValue] = useState(0);
    const handleWord = (word) => {
        setContent(false);
        setWord(word);
    }

    //function to enable us to move to the next page
    const handleIndexIncrement = () => {
        let increment = value + 1;
        if (increment < count) {
            setValue(increment);
        }
    }

    //function to enable us to move to the previous page
    const handleIndexDecrement = () => {
        if (value > 0) {
            let decrement = value - 1;

            setValue(decrement);
        }
    }


    //this will display th loading state of our app until we get data
    if (loading) {
        return <div>loading</div>
    }

    //this is used to render an error on the screen if we dont  get any data from our query
    if (error) {
        return <div>{error.message}</div>
    }

    return (

        <>

            <h1>
                {data.book.title}
            </h1>

            <h3>
                {data.book.author}
            </h3>

            {/* using the map method to loop over  our data */}
            {content ? data.book.pages.map((dataObj, index) => {

                if (index === value) {


                    let pageData = dataObj.tokens;

                    let words = [];
                    pageData.map((item) => {
                        let val = item.value;

                        words.push(val);
                        return words
                    });

                    return <div className={classes.paragraph} key={index}>{words.map((word, id) => {
                        return (<span key={id} onClick={() => { handleWord(word) }} >{word + " "}</span>)
                    })}


                        <div className={classes.buttonContainer}>
                            <span >
                                <button className={classes.buttons} type="button" onClick={() => { handleIndexDecrement() }}>Back</button>
                            </span>
                            <span>
                                <button className={classes.buttons} type="button" onClick={() => { handleIndexIncrement() }}>Next</button>
                            </span>
                        </div>

                    </div>
                }
            }) : <span>{word}</span>
            }

        </>

    )
}

export default Book