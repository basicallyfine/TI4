import { useLayoutEffect, useState } from "react";

export const SliceDisplay = () => {
    const [sliceNumbers, setSliceNumbers] = useState<number[][]>([]);
  useLayoutEffect(() => {
    const query = window?.location?.search;
    console.log(query);
    if (query && query.match(/^\?*[\d,;]+/)) {
        const numbers = query
            .replace(/^[^\d]+/, "")
            .split(';')
            .map(s => s.split(',').map(Number));
        console.log(numbers);
        setSliceNumbers(numbers);
    }
  },[]);
  return (
    <pre>{JSON.stringify(sliceNumbers)}</pre>
  );
};
