import React from 'react'

const Filter = ({value, callback}) => {

    return (
        <form>
            <div>
                filter: <input value={value} onChange={callback} />
            </div>
        </form>
    )
}

export default Filter