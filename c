case "$1" in
        start)
            docker-compose up -d
            ;;
        stop)
            docker-compose down
            ;;
        node)
            shift
            docker exec -ti martinschneiderme-11ty_node node $@
            ;; 
        npx)
            shift
            docker exec -ti martinschneiderme-11ty_node npx $@
            ;;  
        npm)
            shift
            docker exec -ti martinschneiderme-11ty_node npm $@
            ;;   
        serve)
            shift
            docker exec -ti --env ELEVENTY_ENV=development martinschneiderme-11ty_node npx @11ty/eleventy --serve
            ;;      
        build)
            shift
            docker exec -ti martinschneiderme-11ty_node npx @11ty/eleventy
            ;;
        netlify)
            shift
            docker exec -ti martinschneiderme-11ty_node npx netlify $@
            ;;
esac
