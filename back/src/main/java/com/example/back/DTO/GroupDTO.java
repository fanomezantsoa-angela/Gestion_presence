package com.example.back.DTO;

import jakarta.validation.constraints.NotBlank;

public class GroupDTO {
    @NotBlank(message = "Group name required")
    private String groupname;

    public String getGroupname() {
        return groupname;
    }

}
