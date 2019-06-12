import React from 'react'

const Log = ({ log }) => <p className={log.type}>{log.msg}</p>

export default Log
