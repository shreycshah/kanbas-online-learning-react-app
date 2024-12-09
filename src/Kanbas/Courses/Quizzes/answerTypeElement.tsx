export default function AnswerTypeElement({text="dummy text", color}:{text:string, color:string}){
    const buttonStyle: React.CSSProperties = {
        borderRadius: "00%",
        clipPath:
          "polygon(0% 0%, 90% 0%, 100% 50%, 100% 50%, 90% 100%, 20% 100%, 0% 100%, 0% 0%)",
      };
    return(
        <div className={`btn ${color} ps-4 pe-5 align-items-center d-flex`} style={buttonStyle}>
                      {text}
                    </div>
    )
}