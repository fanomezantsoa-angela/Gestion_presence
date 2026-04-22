package com.example.back.Controller;
import com.example.back.DTO.ResponseStudentDTO;
import com.example.back.Service.StudentService;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.resttestclient.autoconfigure.AutoConfigureRestTestClient;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.client.RestTestClient;

import java.util.List;


@WebMvcTest(StudentController.class)
@AutoConfigureRestTestClient
public class StudentControllerTest {
    @Autowired
    private RestTestClient restTestClient;
    @MockitoBean
    private StudentService studentService;
    @Test
    void TestingGetAllStudent() throws Exception{

        restTestClient.get().uri("/api/student/All")

        .exchange()
                .expectBody(List.class);

    }
}
