package com.enaplic.baseline.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_baseline", schema = "dbo", catalog = "enaplic_management")
public class Baseline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_qp", nullable = false, length = 6)
    private String codQp;

    @Column(name="equipamento", nullable = false, length = 200)
    private String equipamento;
}
