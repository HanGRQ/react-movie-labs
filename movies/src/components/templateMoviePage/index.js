import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Paper from "@mui/material/Paper";

const TemplateMoviePage = ({ movie, children }) => {
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data.posters 

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        {/* 左侧图片列表 */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <ImageList
                sx={{
                    height: "100vh",
                    width: "100%", // 占满容器宽度
                }}
                // 动态调整列数
                cols={Math.min(images.length, 4)} // 最多4列，但不会超过实际图片数量
            >
                {images.map((image,index) => (
                    <ImageListItem 
                      key={image.file_path ? image.file_path : index} 
                      sx={{
                        width: images.length < 4 ? `calc(${100 / images.length}% - 10px)` : "auto", // 动态宽度
                        margin: "5px", // 添加间距
                      }}
                    >
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                        style={{
                          width: "100%", // 图片占满父容器
                          height: "auto", // 高度等比缩放
                        }}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          </Paper>
        </Grid>

        {/* 右侧内容区域 */}
        <Grid item xs={12} sm={8} md={9}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;