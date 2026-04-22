package com.example.back.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CalendarDTO {
    @NotBlank(message = "calendar name required")
    private String name;
    @NotNull
    private Long group_id;



    public Long getGroup_id() {
        return group_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
