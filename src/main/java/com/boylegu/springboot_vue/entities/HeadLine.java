package com.boylegu.springboot_vue.entities;

import org.springframework.stereotype.Controller;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "tb_head_line")
public class HeadLine implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long lineId;
    @Column(name = "line_name")
    private  String lineName;
    @Column(name="line_link")
    private  String lineLink;
    @Column(name="line_img")
    private  String lineImg;
    @Column(name="priority")
    private Integer priority;
    //0.不可用 1.可用
    @Column(name="enable_status")
    private Integer enableStatus;
    @Column(name="create_time")
    private Date createTime;
    @Column(name="last_edit_time")
    private Date lastEditTime;

    public Long getLineId() {
        return lineId;
    }

    public void setLineId(Long lineId) {
        this.lineId = lineId;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getLineLink() {
        return lineLink;
    }

    public void setLineLink(String lineLink) {
        this.lineLink = lineLink;
    }

    public String getLineImg() {
        return lineImg;
    }

    public void setLineImg(String lineImg) {
        this.lineImg = lineImg;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getEnableStatus() {
        return enableStatus;
    }

    public void setEnableStatus(Integer enableStatus) {
        this.enableStatus = enableStatus;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastEditTime() {
        return lastEditTime;
    }

    public void setLastEditTime(Date lastEditTime) {
        this.lastEditTime = lastEditTime;
    }
}
