import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const dataPie = [
  { name: "Utilisateurs", value: 400 },
  { name: "Réservations", value: 300 },
  { name: "Commandes", value: 300 },
  { name: "Messages", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataBar = [
  { name: "Jan", uv: 400, pv: 2400 },
  { name: "Fév", uv: 300, pv: 1398 },
  { name: "Mars", uv: 200, pv: 9800 },
  { name: "Avr", uv: 278, pv: 3908 },
  { name: "Mai", uv: 189, pv: 4800 },
];

export default function DashboardWow() {
  const [search, setSearch] = useState("");
  const [actions, setActions] = useState([
  
  ]);

  const filteredActions = actions.filter((act) =>
    act.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 40, color: "#333" }}>
        Dashboard Wow 🎉
      </h1>

      <input
        type="text"
        placeholder="Rechercher dans les actions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          marginBottom: 30,
          borderRadius: 8,
          border: "1px solid #ccc",
          outlineColor: "#0088FE",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#0088FE")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
      />

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 350px",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: 15, color: "#555" }}>
            Répartition des éléments
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={true}
              >
                {dataPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ transition: "all 0.3s" }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            flex: "1 1 450px",
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: 15, color: "#555" }}>
            Activités mensuelles
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataBar}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              isAnimationActive={true}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uv" fill="#82ca9d" />
              <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 20, color: "#444" }}>Dernières actions</h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxHeight: 200,
            overflowY: "auto",
            border: "1px solid #eee",
            borderRadius: 10,
            backgroundColor: "#fff",
            boxShadow: "inset 0 0 10px #f0f0f0",
          }}
        >
          {filteredActions.length === 0 ? (
            <li style={{ padding: 10, color: "#777" }}>
              Aucune action trouvée.
            </li>
          ) : (
            filteredActions.map((act, i) => (
              <li
                key={i}
                style={{
                  padding: "10px 20px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f8ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {act}
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
