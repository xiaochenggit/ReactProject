import React , { Component } from 'react';
import './style.css';
class Progress extends Component {
    hanleClick(e) {
        // 获得元素
        var progressBar = this.refs.progressBar;
        // 百分比 点击的位置 - 元素距离左边的位置  除以 元素的宽度
        var percent  = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.changePercent(percent)
    }
    render() {
        return(
            <div className='progressBar' style={{
            width: this.props.width || '100%',
            height: this.props.height || '10px',
            backgroundColor: this.props.barColor || ''
            }} ref='progressBar' onClick={this.hanleClick.bind(this)}>
                <div className='progress' style={{
                 width: this.props.percent + '%' || '0%',
                 backgroundColor: this.props.color || '#108ee9'
                }}>
                </div>
            </div>
        )
    }

}

export default Progress;