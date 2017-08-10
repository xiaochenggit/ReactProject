import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'antd';
import './cover.css';
class Cover extends Component {
    constructor() {
        super();
        this.state = {
            update_date: '',
            img: '',
            name: '',
            comment: '',
            search: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type='
        }
    }
    componentWillMount() {
        $.ajax({
            url: this.state.search + this.props.id,
            type: 'POST',
            dataType: 'jsonp',
            xhrFields : {
	       		withCredentials:true
            },
            success: (data)=> {
                let billboard = data.billboard;
                this.setState({
                    update_date: billboard.update_date,
                    name: billboard.name,
                    comment: billboard.comment,
                    img: require('../../images/' + this.props.id + '.jpg')
                });
            }
        });
    }
    render() {
        let state = this.state;
        return(
            <Card className='cover' style={{width: this.props.width}}>
                <Link to={'/list/'+ this.props.id}>
                    <div className="custom-image">
                        <img src={state.img} alt={state.name} title={state.comment} />
                    </div>
                    <div className="custom-card">
                        <h3>{state.name}</h3>
                    </div>
                </Link>
            </Card>
        )
    }

}

export default Cover;