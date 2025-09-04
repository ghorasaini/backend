let books =[
    {
        id:1,
        title: "book One",
        author: "Author A",
    },
    {
        id:2,
        title: "book Two",
        author: "Author B"

    },]

   
    const createBook = (req, res) => {

        try{
        const {title, author} = req.body;
        if (!title || !author){
            return res.status(401).json({
                message: "All field are required",
            })
        }
        const newBook = { id: books.length + 1, title, author}
        books.push (newBook);
        console.log(books);
        res.status (201).json(newBook);
        
    } catch(error){
        console.log (error);
        res.status (500).json({
            message: "Internal save error"
        })
    
    } }

  


    const getBook = (req, res) => {
        res.send (books);
    };



    const deleteBook = (req, res) => {
        books = books.filter ((b) => b.id !==parseInt (req.params.id));
           console.log (books);
           res.json ({ message: "book deleted"});
    }
   

    const putBook = (req, res) => {
        const {title, author} = req.body
            const book = books.find((b) => b.id === parseInt (req.params.id));
            book.title = title;
            book.author = author;
        
            console.log(book);
            res.json (book);

    }

  

    export {createBook,getBook, deleteBook, putBook}