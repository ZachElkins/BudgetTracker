import React, { useEffect, useRef } from 'react';

// https://stackoverflow.com/a/57941438/6939768
// Might not need this, but using for now in place of useEffect
// Still seems to call once on render. Better than twice I guess...

const useDidMountEffect = (func: () => any, deps: any[]) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};

export default useDidMountEffect;
