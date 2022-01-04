import { useEffect,useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();

        setTimeout(()=>{
            const token = localStorage.getItem('token');
            fetch(url,{headers : {
                        'Authorization': 'Bearer '+token,
                        'accept-language': 'application/json',
                        'content-type': 'application/json'
                    }},
                 {signal:abortCont.signal,
                    })
            .then(res =>{
                if(!res.ok) {
                    throw Error('could not fetch the data for the resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 1000);
        return () => abortCont.abort();
    }, [url]);
    return {data, isPending, error}
}
export default useFetch;