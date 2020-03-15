import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () => {
 	const [name, setName] = useState(''); // New State variable name called with the function setName = setState('Name: valor')
 	const [room, setRoom] = useState(''); // New State variable room called with the function setRoom = setState('Room: valor')

	return(
		<div className='joinOuterContainer'>
			<div className='joinInnerContainer'>
			<h1 className='heading'>Join</h1>
			<div><input placeholder="Name" className='joinInput' type='text' onChange={(event) => setName(event.target.value)} /></div>
			<div><input placeholder="Room" className='joinInput' type='text mt-20' onChange={(event) => setRoom(event.target.value)} /></div>
			<Link
				onClick={event => (!name || !room) ? event.preventDefault(): null}
				to={`/chat?name=${name}&room=${room}`}>
					<button 
					className='button mt-20' 
					type='submit'>Sign In</button>
			</Link>
			</div>
			</div>
	)
}




export default Join;