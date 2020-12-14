const Script = ({ children }) => {
    return (
        <script dangerouslySetInnerHTML={{__html: `(${children.toString()})();` }}></script>
    )
}

export default Script