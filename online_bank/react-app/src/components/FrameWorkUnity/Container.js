import React from 'react';
import BGimg from '../../images/bg.jpeg';
import slide1 from  '../../images/IMG_1055.jpeg';
import slide2 from  '../../images/002.jpeg';
import slide3 from  '../../images/001.jpeg';

const Left = () => {
  const styleLeft = {
    // backgroundColor: '#5F5F5F',
    // height:'auto',
    // width: '30%',
    // opacity: '0.70',
    // float: 'left',
    // borderRadius: '10px 10px 10px 10px',
    // border: '2px solid blue',
  }

  // const text1 = {
  //   paddingTop: '10px',
  //   font: 'Helvetica',
  //   position: 'flex',
  //   color: 'white',
  //   fontSize: '30px',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   boxShadow: '0 30px 60px 0 rgba(0,0,255,0.3)',
  //   paddingBottom: '15px',
  // }
  // const text2 = {
  //   display: "block",
  //   lineHeight: '150%',
  //   font: 'Helvetica',
  //   position: 'flex',
  //   color: 'white',
  //   fontSize: '25px',
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   paddingBottom: '15px',
  //   boxShadow: '30 30 0 30 rgba(0,0,255,0.3)',
  // }
  // const text3 = {
  //   lineHeight: '105ç%',
  //   font: 'Helvetica',
  //   position: 'flex',
  //   color: 'white',
  //   fontSize: '20px',
  //   textAlign: 'center',
  // }

  // const center3 = {
  //   marginLeft: '18%',
  //   position: 'flex',
  //   height:'50%',
  //   width: '65%',
  //   opacity: '0.98',
  //   textAlign: 'center',
  //   WebkitBorderRadius:'5px 5px 5px 5px',
  //   boxShadow: '5px 1px 5px, 5px 1px 5px',
  //   border: '1px',
  //   color: '#e6f2ff',
  // }

  return (
    <div>
       {}
  </div>

  );
}


const Right = (props) => {

  const styleRight = {
    backgroundColor: '#B0C4DE',
    height:'auto',
    width: '100%',
    opacity: '0.70',
    borderRadius: '10px 10px 10px 10px',
    border: '2px solid blue',
    float: 'centre',
    
  }

  return (
    <div className ="RightContainer" style={styleRight}>
      {props.children}
    </div>
  );
}

const Container = (props) => {
  const containerStyle = {
    backgroundImage: "url(" + BGimg + ")",
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center',
    minHeight:'100%',
    width:'50%',
    display: 'flex',
    position: 'absolute',
    minWidth: '100%',
    
   

  }

  return (
    <div className ="container" style ={containerStyle}>
      <Left/>
      <Right>
        {props.children}
      </Right>
    </div>
  );
}

export default Container;