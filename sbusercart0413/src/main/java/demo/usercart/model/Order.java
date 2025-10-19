package demo.usercart.model;

import java.time.LocalDateTime;
import java.util.*;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private LocalDateTime orderTime;

    private Integer totalPrice;
    
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, targetEntity=OrderItem.class, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    // getters, setters
}

