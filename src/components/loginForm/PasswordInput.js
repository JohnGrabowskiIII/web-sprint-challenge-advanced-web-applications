import React from 'react'

const PasswordInput = (props) => {

    const {value, change} = props

    return (
        <label>
            Password
            <input 
                type='password'
                id='password'
                name='password'
                value={value}
                onChange={change}
                placeholder='School'
            />  
        </label>
        
    )

}

export default PasswordInput;