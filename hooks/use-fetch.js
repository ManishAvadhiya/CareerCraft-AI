import { toast } from "sonner";

const { useCallback, useState } = require("react");

const useFetch = (cb)=>{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const fn = async (...args)=>{
        setLoading(true);
        setError(null);
        try {
        const response = await cb(...args);
        setData(response);
        setError(null)
        } catch (error) {
        setError(error);
        toast.error(error.message);
        } finally {
        setLoading(false);
        }
    };
    return {
        loading,
        data,
        error,
        fn
    };
}
export default useFetch;